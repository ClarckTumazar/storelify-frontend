
const vidExtensions = {
  avi:	'Audio Video Interleave File',
  flv:	'Adobe Flash Video File',
 h264:  'H.264 video File',
  m4v:	'Apple MP4 video File',
  mkv:	'Matroska Multimedia Container',
  mp4:	'MPEG-4 Video File',
  mov:	'Apple QuickTime movie File',
  mpg: 	'MPEG video File',
 mpeg: 	'MPEG video File',
   rm:  'Real Media File',
  swf:	'Shockwave flash File',
  vob:	'DVD Video Object File',
  wmv:  'Windows Media Video File',
}

const audioExtensions = {
  aif:	'AIF/Audio Interchange audio file',
  cda:	'CD audio track file',
  iff:	'Interchange File Format',
  mid:  'MIDI audio file.',
 midi:  'MIDI audio file.',
  mp3:	'audio file',
  MP3:  'audio file',
  mpa:	'MPEG-2 audio file',
  wav:	'WAVE file',
  wma:	'Windows Media audio file',
  wpl:	'Windows Media Player playlist',
}


function getFileType (type) {
  
  if (vidExtensions.hasOwnProperty(type)) 
    return vidExtensions[type]
  if (audioExtensions.hasOwnProperty(type)) 
    return audioExtensions[type]

    
}

export default getFileType;