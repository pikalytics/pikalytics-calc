Pikalytics Damage Calculator
=======================

[Pikalytics' Damage Calculator](https://pikalytics.com/calc) for Pokemon Sword & Shield Doubles and Singles formats (with VGC 2020/2021 focused sets and support). Based on Honko/Zarel's Damage Calc project which lives on through the [Smogon Damage Calc](https://github.com/smogon/damage-calc).

This repo is intended to provide an avenue of community contribution to the ever evolving Pikalytics Damage Calculator. Please feel free to submit well documented pull requests for changes or functionality you would like to see added to Pikalytics' Damage Calculator!

This repo represents a fairly direct extraction of Pikalytics Damage Calculator out of the main closed source repository. Some file references have been update in index.html to support this, and some references have been hard-coded to utilize Pikalytics' production CDN (for simplicity & consistency sake). This is a WIP repository, and there will likely be issues that arise due to this attempt at decoupling the calculator from the main Pikalytics repository.

Instructions
------------

- `npm install` to install the `@smogon/calc` and `serve` modules for development
- `npm run dev` to start up a server on port `5000`
- Visit http://localhost:5000/dmgcalc in your browser

Any new CSS should utilize the [pikalytics_calc_styles.css](dmgcalc/pikalytics_calc_styles.css) stylesheet, to override styles when hosted on production Pikalytics.

Credits and license
-------------------

MIT License.

This project was originally created by Honko, and is maintained by Pikalytics.

Many other contributors have added features or contributed bug fixes over time. See the [Smogon Damage Calc Contributors](https://github.com/smogon/damage-calc/graphs/contributors) for a list of many contributors that participated in the source code that led to Pikalytics Damage Calc.