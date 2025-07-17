# Changelog

All notable updates to the Link Translator project are documented below.

---

## v1.4
- Introduced animated Navi cursor that follows the mouse pointer
- Hid the default system cursor for full custom experience
- Fixed layout overflow issue where the main card extended beyond its container
- Switched dark mode icons dynamically (moon for light, sun for dark)
- Made dark mode icon transparent for better aesthetic integration

## v1.3
- Added dark mode toggle functionality with smooth transition support
- Introduced light/dark color schemes for card, text areas, buttons, and typography
- Theme state now updates icons and component styles consistently

## v1.2
- Implemented Grunt → English reverse translation support
- Created and integrated `reverse_map.js` with buffer-matching algorithm
- Added direction dropdown to toggle translation modes
- Improved translation logging for debugging

## v1.1
- Added "Copy" button to copy output text to clipboard
- Button temporarily changes to "Copied!" for user feedback
- Separated translation logic into `grunt_map.js` and `script.js`
- Introduced visual translation counter

## v1.0
- Completed first full public version
- Fully implemented English → Grunt translation using word map
- Designed responsive layout and card-based UI
- Added version badge and GitHub issue link
- Supported mobile-friendly viewport scaling

---

## v0.4
- Introduced basic responsive layout using flexbox
- Created prototype UI card with version badge
- Added GitHub icon and placeholder for future buttons
- Improved basic styling for input/output fields

## v0.3
- Replaced browser alert testing with on-page translation output box
- Created minimal design structure in HTML and CSS
- Added placeholder Triforce icons and early title styling
- Set up consistent spacing and text alignment

## v0.2
- Replaced inline script with separate `script.js` file
- Cleaned up word map logic to be case-insensitive
- Allowed basic punctuation filtering
- Set up initial folder structure (images/, scripts/, styles/)

## v0.1
- Created initial concept and prototype with static HTML
- Added basic JavaScript function to replace words with Grunt equivalents
- Hardcoded `grunt_map` object in browser console
- Used alert boxes to display translated output
