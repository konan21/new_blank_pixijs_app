import * as PixiJs from "pixi.js";

window.PIXI = PixiJs;
// eslint-disable-next-line import/export
export * from "resource-loader";
// eslint-disable-next-line import/export
export {IAddOptions, Loader, Resource} from "resource-loader";
// eslint-disable-next-line import/export
export * from "pixi.js";
export {
	IAddOptions as IPixiAddOptions,
	Loader as PixiLoader,
	Resource as PixiResource,
	settings as pixiSettings
} from "pixi.js";

declare module "@pixi/display" {
	interface Container {
		declaredHeight: number;
		declaredWidth: number;
		offsetMinX: number;
		offsetMinY: number;
	}
}
