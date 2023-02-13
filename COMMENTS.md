### Changes made on (20/06)

#### Directly in dev branch

##### Major Changes
- [Commit in multiple files to make more responsive](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/634fe1ce9f8a9188917a60594460723f68d8bbda)
- [Commit to add loader GIF](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/ea5f9707965ff6c64eaf7a89ace8138dc01ae324)
- [Commit to add loader in explore videos page](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/e03b8e8ae16d1dcde7c4ab02f19226267c0fdca3)
- [Commit to add common icons import export](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/9501cf63218d94050373c44e44b60234786409ef)
- [Commits in multiple files to import icons from assets](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/31eb7ac601564fe1c959e9e91753490797742268)
- [Commit to add mobile category filter](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/7b613321a799bb0d503be9bb9edd60939a2134ad)
##### Minor Changes
- Updated COMMENTS.md
- [Commit to add missing youtuber avatar](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/80155ca04ebac864772adc9422cf4e3357a2e625)
- [Commit to modify toast](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/62845f484a2051ea5c49f75ac3824675aa51cc90)
- [Commit to add some headings](https://github.com/bhavyaj12/halcyon-gaming-lib/commit/347e4fb3bb9cf77940a0c64651a2a7a4be696405)

### Changes made on (11/06)

#### In merging pull request #10 - temp-dev

##### Major Changes
- (src\pages\ExplorePage\ExplorePage.jsx): Lines 11 to 16: Added a cleanup in useEffect for memory leak
- (src\App.js): Memoized the footer as its static, to prevent re-rendering on every page and route change.
- (new file: src\components\SearchBar\SearchBar.jsx): Moved from NavTop to here, added debouncing in search
- (src\components\CategoryFilter\CategoryFilter.jsx, src\contexts\videos-context.js, 
src\pages\ExplorePage\explore-page.css, src\pages\ExplorePage\ExplorePage.jsx, src\reducers\videosReducer.js, src\utilities\filterVideos.js, src\utilities\index.js): Added Filter by category functionality

##### Minor Changes
- Removed console.logs from every file
- (new file: COMMENTS.md): Added comments.md
- (new asset: public\assets\banner-2.jpg): Deleted previous 19Mb image banner-2, exchanged banner-1 and 2
- (src\components\NavigationTop\NavigationTop.jsx): Line 149 signoutFn, Line 169 added class reset-btn-hover, Lines 87, 96, 155, 164: Added reset-btn-hover class, Deleted NavLink Account
- (src\components\PlaylistCard\PlaylistCard.jsx): Line 29: removed m1 class, Line 36: removed p-2, Line 52: removed {""}
- (src\pages\SinglePlaylistPage\SinglePlaylistPage.jsx): Line 20 to 37: Fixed breaking change on refresh, added return null if playlist empty, Line 30: fixed breaking warning instead of playlist._id had to pass video._id
- (src\styles\main.css): Line 35 to 40: Added flex-cards properties for fixing video listing pages, Line 50 to 54: Added reset btn hover class properties to fix default chrome button behavior
- (src\components\HomeCarousel\HomeCarousel.jsx): Line 29 Added reset-btn-hover class
- (src\components\PlaylistVideos\PlaylistVideos.jsx): Line 78: Added reset-btn-hover class
- (src\components\VideoCard\VideoCard.jsx): Line 141: Added reset-btn-hover class
- (src\pages\AuthenticationPage\LoginPage.jsx): Removed forgot password and signup row in form, added reset-btn-hover class
- (src\pages\AuthenticationPage\SignupPage.jsx): Line 180: added reset-btn-hover class
- (src\pages\HistoryPage\HistoryPage.jsx): Line 29 added reset-btn-hover class, Line 36 added flex-cards class
- (src\pages\LikedPage\LikedPage.jsx, src\pages\PlaylistPage\PlaylistPage.jsx, src\pages\WatchLaterPage\WatchLaterPage.jsx): Added flex-cards class
- (src\components\HomeCarousel\home-carousel.css): Line 20 to 23: Added hover to Watch Now button
