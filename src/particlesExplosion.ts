import {ParticlesExample} from "./ParticlesExample";

export function initParticlesExplosion() {
	new ParticlesExample(
		// The image to use
		["../assets/images/particle.png"],

		// Emitter configuration, edit this to change the look
		// of the emitter
		{
			"alpha": {
				"start": 0.8,
				"end": 0.1
			},
			"scale": {
				"start": 1,
				"end": 0.3
			},
			"color": {
				"start": "fb1010",
				"end": "f5b830"
			},
			"speed": {
				"start": 200,
				"end": 100
			},
			"startRotation": {
				"min": 0,
				"max": 360
			},
			"rotationSpeed": {
				"min": 0,
				"max": 0
			},
			"lifetime": {
				"min": 0.5,
				"max": 0.5
			},
			"frequency": 0.008,
			"emitterLifetime": 0.31,
			"maxParticles": 1000,
			"pos": {
				"x": 0,
				"y": 0
			},
			"addAtBack": false,
			"spawnType": "circle",
			"spawnCircle": {
				"x": 0,
				"y": 0,
				"r": 10
			}
		}
	);
}
