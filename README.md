<p align="center">
<img style="margin:auto;" src="https://github.com/pikalytics/pikalytics-calc/blob/master/calc.png?raw=true" width=700 />
</p>

Pikalytics Damage Calculator
=======================

![Tests](https://github.com/pikalytics/pikalytics-calc/workflows/Tests/badge.svg)

[Pikalytics' Damage Calculator](https://pikalytics.com/calc) for Pokemon Sword & Shield Doubles and Singles formats (with VGC 2020/2021 focused sets and support). Based on Honko/Zarel's Damage Calc project which lives on through the [Smogon Damage Calc](https://github.com/smogon/damage-calc).

This repo is intended to provide an avenue for community contribution to the ever evolving Pikalytics Damage Calculator. Please feel free to submit well documented pull requests for changes or functionality you would like to see added to the Pikalytics' Damage Calculator!

This repo represents a fairly direct extraction of Pikalytics Damage Calculator out of the main closed source repository. Some file references have been update in index.html to support this, and some references have been hard-coded to utilize Pikalytics' production CDN (for simplicity & consistency sake). This is a WIP repository, and there will likely be issues that arise due to this attempt at decoupling the calculator from the main Pikalytics repository.

Under the hood calculator logic is running on [@pikalytics/calc](https://github.com/pikalytics/damage-calc) (forked from the ongoing project [@smogon/calc](https://github.com/smogon/damage-calc)). This repository mostly serves to improve and update the Pikalytics Damage Calc-specific interface and how this UI ties in to the @pikalytics/calc library under the hood. If you would like to use a different version/fork of @pikalytics/calc, you can reinstall the npm module at a different version and this calculator will utilize that version.

If you're developing on a local fork of the @pikalytics/calc or @smogon/calc module, you'll need to change the `production.min.js` and `data/production.min.js` references in [index.html](dmgcalc/index.html) to point to your local dev copies of those files.

The [Pikalytics Setdex](dmgcalc/js/setdex_pikalytics_v12.js) is derived from the [pikalytics-setdex](https://github.com/GriffinLedingham/pikalytics-setdex) generator project, and new Pikalytics Setdexes can be generated via this other repository (contributors would be welcome to generate & pull request OU, Ubers, etc. setdexes based on Smogon usage, by utilizing the pikalytics-setdex tool).

Instructions
------------

- `npm install` to install the `@smogon/calc` and `serve` modules for development
- `npm run dev` to start up a server on port `5000`
- Visit http://localhost:5000/dmgcalc in your browser

Any new CSS should utilize the [pikalytics_calc_styles.css](dmgcalc/pikalytics_calc_styles.css) stylesheet, to override styles when hosted on production Pikalytics.

Credits and license
-------------------

MIT License.

This is an open-source release of the Pikalytics Damage Calculator. As this repository evolves and changes, the live damage calculator on Pikalytics will be brought up to date with this repository's upstream master branch.

The Damage Calc project was originally created by Honko, and this fork is maintained by Pikalytics and the wider community.

Many other contributors have added features or contributed bug fixes over time. See the [Smogon Damage Calc Contributors](https://github.com/smogon/damage-calc/graphs/contributors) for a list of many contributors that participated in the source code that led to Pikalytics Damage Calc.
