(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
		
		var currentAlbum = Fixtures.getAlbum();
		
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;
        
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function (song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}
			
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			SongPlayer.currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Play a song
		* @param {Object} song
		*/
		var playSong = function (song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		
		var stopSong = function () {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
			
		}
		
		/**
		* @function getSongIndex
		* @desc Get index of song in the songs array
		* @param {Object} song
		* @returns {Number}
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		/**
		* @desc Active song object from list of songs
		* @type {Object}
		*/
		SongPlayer.currentSong = null;
		
		
		/**
		* @function play
		* @desc Play current or new song
		* @param {Object} song
		*/
        SongPlayer.play = function (song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
            	playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if(currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
        };
		
		/**
		* @function pause
		* @desc Pause current song
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		/**
		* @function previous
		* @desc Set song to previous song in album
		*/
		SongPlayer.previous = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if(currentSongIndex < 0) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		SongPlayer.next = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if(currentSongIndex > (currentAlbum.songs.length - 1)) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();