<template>
    <div id='body'>
        <div id='header'>
            <h1>
                Select Your Platform
            </h1>
        </div>
        <div id='music-list'>
            <ul>
                <li class='platform-btn' v-for='platform in updatedPlatforms' :key='platform.name'>
                    <div class='platform-div'>
                        <a class='platform-a' :href='platform.link'>
                            <img :src='platform.img' :alt='platform.name'/>
                            <p>{{platform.name}}</p>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    data(){
        return {
            platforms: [
                {
                    name: 'Apple Music',
                    img: require('@/assets/am-icon.png'),
                    artistPage: 'https://music.apple.com/us/artist/finn-morrison/1368928192',
                    latestAlbum: 'https://music.apple.com/us/album/painted-faces/1554676173',
                    link: '',
                },
                {
                    name: 'Spotify',
                    img: require('@/assets/spotify-icon.png'),
                    artistPage: 'https://open.spotify.com/artist/2OqONEYPkgY4r9CQTc3ecy?si=_sKK4EIMTXetJDYfz4kL6g',
                    latestAlbum: 'https://open.spotify.com/album/4X01gGPtXMhJT6AbVOmgqb',
                    link: '',
                },
                {
                    name: 'Youtube Music',
                    img: require('@/assets/yt-icon-sqr.png'),
                    artistPage: 'https://www.youtube.com/channel/UCp-cumFNUlet8IrTQOaz-XQ',
                    latestAlbum: 'https://www.youtube.com/watch?v=NoIQIDoXTj0&list=OLAK5uy_lB0QI2v01Lz0JhRc7E6cNVGm2N4xvt21k&ab_channel=FinnMorrison-Topic',
                    link: '',
                },
                {
                    name: 'Amazon Music',
                    img: require('@/assets/amazon-icon.png'),
                    artistPage: 'https://www.amazon.com/dp/B07BVJW2L3/ref=dm_ws_ps_adp',
                    latestAlbum: '',
                    link: '',
                },
                {
                    name: 'Tidal',
                    img: require('@/assets/tidal-icon.png'),
                    artistPage: 'https://tidal.com/browse/artist/9707026',
                    latestAlbum: 'https://tidal.com/browse/album/174436702',
                    link: '',
                },
                {
                    name: 'Deezer',
                    img: require('@/assets/deezer-icon.png'),
                    artistPage: 'https://www.deezer.com/us/artist/14469429',
                    latestAlbum: 'https://www.deezer.com/us/album/209302382',
                    link: '',
                },
                {
                    name: 'Napster',
                    img: require('@/assets/napster-icon.png'),
                    artistPage: 'https://us.napster.com/artist/finn-morrison',
                    latestAlbum: '',
                    link: '',
                },
                {
                    name: 'iHeart Radio',
                    img: require('@/assets/ihr-icon.png'),
                    artistPage: 'https://www.iheart.com/artist/finn-morrison-32078840/',
                    latestAlbum: 'https://www.iheart.com/artist/finn-morrison-32078840/albums/painted-faces-126738379/',
                    link: '',
                },
            ]
        };
    },
    computed: {
        updatedPlatforms(){
            for (let platform of this.platforms) {
                platform.link = (platform.latestAlbum==='')?platform.artistPage:platform.latestAlbum;
            }
            return this.platforms;
        }
    }
}
</script>

<style scoped>
* {
    border: 1px solid rgba(0, 0, 0, 0);
}

#body {
    /* background-image: url('~@/assets/background.jpg'); */
    font-family: 'Poppins', sans-serif;
    background-attachment: fixed;
}

#music-list {
    width: 100%;
    margin: 0 auto;
}

ul {
    list-style: none;
    padding-left: 0;
}

#header>h1 {
    text-align: center;
    font-weight: bolder;
    /* text-decoration: underline; */
    background-color: rgba(0, 0, 0, .2);
    border-radius: 15px;

    padding: 5px;
    font-size: 28px;

    color: white;
}
#header {
    margin: 10px; 
}

.platform-a {
    border-radius: 10px;

    background-color: rgba(255, 255, 255, .8);

    display: flex;
    justify-content: left;
    padding: 10px;
    margin: 10px;

    text-decoration: none;
    font-weight: bold;
    color: black;
}
.platform-a:hover {
    text-decoration: none;
}

.platform-a>img {
    width: 50px;
    height: 50px;
    padding: 5px;
    border-radius: 10px;
}
.platform-a>p {
    margin: auto 0;
    padding-left: 5%;

    font-size: 18px;
}

@media only screen and (min-width: 376px) {
    #body {
        /* background-image: url('~@/assets/background-desktop.jpg'); */
    }

    #music-list {
        width: 50%;
    }

    ul>li{
        padding: 1px 0;
    }
}
</style>