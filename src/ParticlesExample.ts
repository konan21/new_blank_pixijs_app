import {ParticleContainer, Texture, Sprite, Container, Renderer, PixiLoader} from "./pixi";
import {AnimatedParticle, Emitter, LinkedListContainer, ParticleUtils, PathParticle} from "./pixi/particles";

export class ParticlesExample {
	public stage: Container = new Container();
	public emitter: Emitter = null;
	public renderer: Renderer;
	public bg: Sprite = null;
	public updateHook: Function = null;
	public containerHook: Function = null;

	constructor(imagePaths: any, config: any, type?: string, testContainers?: any, stepColors?: any) {
		const canvas = document.createElement("canvas");
		canvas.width = 400;
		canvas.height = 400;
		document.body.insertAdjacentElement("afterbegin", canvas);

		this.renderer = new Renderer({
			width: canvas.width,
			height: canvas.height,
			view: canvas
		});

		const framerate = document.getElementById("framerate");
		const particleCount = document.getElementById("particleCount");
		const containerType = document.getElementById("containerType");

		// Calculate the current time
		let elapsed = Date.now();
		let updateId;

		// Update function every frame
		const update = () => {
			// Update the next frame
			updateId = requestAnimationFrame(update);

			const now = Date.now();
			if (this.emitter) {
				// update emitter (convert to seconds)
				this.emitter.update((now - elapsed) * 0.001);
			}

			// call update hook for specialist examples
			if (this.updateHook) {
				this.updateHook(now - elapsed);
			}

			if (framerate !== null) {
				framerate.innerHTML = `${(1000 / (now - elapsed)).toFixed(2)} fps`;
			}

			elapsed = now;

			if (this.emitter && particleCount !== null) {
				particleCount.innerHTML = `${this.emitter.particleCount} particles`;
			}

			// render the stage
			this.renderer.render(this.stage);
		};

		// Resize the canvas to the size of the window
		window.onresize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			this.renderer.resize(canvas.width, canvas.height);
			if (this.bg) {
				// bg is a 1px by 1px image
				this.bg.scale.x = canvas.width;
				this.bg.scale.y = canvas.height;
			}
		};
		// window.onresize();

		// Preload the particle images and create PIXI textures from it
		let urls;
		let makeTextures = false;
		if (imagePaths.spritesheet) {
			urls = [imagePaths.spritesheet];
		} else if (imagePaths.textures) {
			urls = imagePaths.textures.slice();
		} else {
			urls = imagePaths.slice();
			makeTextures = true;
		}
		urls.push("../assets/images/bg.png");
		const loader = PixiLoader.shared;
		for (let i = 0; i < urls.length; ++i) {
			loader.add("img" + i, urls[i]);
		}
		loader.load(() => {
			this.bg = new Sprite(Texture.from("../assets/images/bg.png"));
			// bg is a 1px by 1px image
			this.bg.scale.x = canvas.width;
			this.bg.scale.y = canvas.height;
			this.bg.tint = 0x000000;
			this.stage.addChild(this.bg);
			// collect the textures, now that they are all loaded
			let art;
			if (makeTextures) {
				art = [];
				for (let i = 0; i < imagePaths.length; ++i) {
					art.push(Texture.from(imagePaths[i]));
				}
			} else {
				art = imagePaths.art;
			}
			// Create the new emitter and attach it to the stage
			let parentType = 0;
			function getContainer(): {
				emitterContainer: ParticleContainer | LinkedListContainer | Container;
				containerName: string;
			} {
				switch (parentType) {
					case 1:
						const pc = new ParticleContainer(1000, {
							scale: true,
							position: true,
							rotation: true,
							uvs: true,
							alpha: true
						});

						return {emitterContainer: pc, containerName: "PIXI.ParticleContainer"};
					case 2:
						return {emitterContainer: new LinkedListContainer(), containerName: "PIXI.particles.LinkedListContainer"};
					default:
						return {emitterContainer: new Container(), containerName: "PIXI.Container"};
				}
			}
			const {emitterContainer, containerName} = getContainer();
			this.stage.addChild(emitterContainer);
			if (containerType !== null) {
				containerType.innerHTML = containerName;
			}

			window.emitter = this.emitter = new Emitter(emitterContainer, art, config);
			if (stepColors) {
				this.emitter.startColor = ParticleUtils.createSteppedGradient(config.color.list, stepColors);
			}
			if (type === "path") {
				this.emitter.particleConstructor = PathParticle;
			} else if (type === "anim") {
				this.emitter.particleConstructor = AnimatedParticle;
			}

			// Center on the stage
			this.emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);

			// Click on the canvas to trigger
			canvas.addEventListener("mouseup", (e: any) => {
				if (!this.emitter) {
					return;
				}

				// right click (or anything but left click)
				if (e.button) {
					if (testContainers) {
						if (++parentType >= 3) {
							parentType = 0;
						}
						const oldParent = emitterContainer;
						if (containerType) {
							containerType.innerHTML = containerName;
						}
						this.stage.addChild(emitterContainer);
						this.emitter.parent = emitterContainer;
						this.stage.removeChild(oldParent);
						oldParent.destroy();

						if (this.containerHook) {
							this.containerHook();
						}
					}
				} else {
					this.emitter.emit = true;
					this.emitter.resetPositionTracking();
					this.emitter.updateOwnerPos(e.offsetX || e.layerX, e.offsetY || e.layerY);
				}
			});

			document.body.addEventListener("contextmenu", (e) => {
				e.preventDefault();

				return false;
			});

			// Start the update
			update();

			// for testing and debugging
			window.destroyEmitter = () => {
				this.emitter.destroy();
				this.emitter = null;
				window.destroyEmitter = null;
				// cancelAnimationFrame(updateId);

				// reset SpriteRenderer's batching to fully release particles for GC
				// if (this.renderer.plugins && this.renderer.plugins.sprite && this.renderer.plugins.sprite.sprites)
				// {
				//     this.renderer.plugins.sprite.sprites.length = 0;
				// }

				this.renderer.render(this.stage);
			};
		});
	}
}
