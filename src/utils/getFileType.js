
export const vidExt = {
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

export const audioExt = {
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

export const imageExt = {
   ai:  'Adobe Illustrator file',
  bmp:  'Bitmap image File',
  gif:  'GIF/Graphical Interchange Format image',
  ico:  'Icon file',
 jpeg:  'JPEG image',
  jpg:  'JPEG image',
  max:  '3ds Max Scene File',
  obj:  'Wavefront 3D Object File',
  png:  'PNG / Portable Network Graphic image',
   ps:  'PostScript file',
  psd:  'PSD / Adobe Photoshop Document image',
  svg:  'Scalable Vector Graphics file',
  tif:  'TIFF image',
 tiff:  'TIFF image',
}

export const fileExt = {
  
  ods:	'OpenOffice Calc spreadsheet file',
  xlr:  'Microsoft Works spreadsheet file',
  xls:	'Microsoft Excel file',
 xlsx:	'Microsoft Excel Open XML spreadsheet file',
  doc:  'Microsoft Word file',
 docx:  'Microsoft Word file',
  odt:  'OpenOffice Writer document file',
  msg:  'Outlook Mail Message',
  pdf:  'PDF file',
  rtf:  'Rich Text Format File',
  tex:  'A LaTeX document file',
  txt:  'Plain text file',
  wks:  'Microsoft Works Word Processor Document file',
  wps:  'Microsoft Works Word Processor Document file',
  wpd:  'WordPerfect document',
  key:	'Keynote presentation',
  odp:	'OpenOffice Impress presentation file',
  pps:	'PowerPoint slide show',
  ppt:	'PowerPoint presentation',
 pptx:	'PowerPoint Open XML presentation',
accdb:	'Access 2007 Database File',
  csv:	'Comma separated value file',
  dat:	'Data file',
   db:  'Database file',
  dbf:  'Database file',
  log:	'Log file',
  mdb:	'Microsoft Access database file',
  pdb:	'Program Database',
  sav:	'Save file (e.g. game save file)',
  sql:	'SQL/Structured Query Language database file',
  tar:	'Linux / Unix tarball file archive',
  bak:	'Backup file',
  cab:  'Windows Cabinet file',
  cfg:  'Configuration file',
  cpl:  'Windows Control panel file',
  cur:  'Windows cursor file',
  dll:  'DLL file',
  dmp:  'Dump file',
  drv:  'Device driver file',
 icns:  'macOS X icon resource file',
  ico:  'Icon file',
  ini:  'Initialization file',
  lnk:  'Windows shortcut file',
  msi:  'Windows installer package',
  sys:  'Windows system file',
  tmp:  'Temporary file',
  asp:  'Active Server Page file',
 aspx:  'Active Server Page file',
  cer:  'Internet security certificate',
  cfm:  'ColdFusion Markup file',
  cgi:  'Perl script file',
   pl:  'Perl script file',
  css:  'Cascading Style Sheet file',
  htm:  'HTML/Hypertext Markup Language file',
 html:  'HTML/Hypertext Markup Language file',
   js:  'JavaScript file',
  jsp:	'Java Server Page file',
 part:	'Partially downloaded file',
  php:	'PHP Source Code file',
  rss:	'RSS/Rich Site Summary file',
xhtml:  'XHTML / Extensible Hypertext Markup Language file',
}


export function getFileType (type, file) {
  console.log(type)
  if (imageExt.hasOwnProperty(type)) 
    return imageExt[type]

  if (vidExt.hasOwnProperty(type)) 
    return vidExt[type]

  if (audioExt.hasOwnProperty(type)) 
    return audioExt[type]

  if (fileExt.hasOwnProperty(type)) 
    return fileExt[type]

  if (file.type) return file.type
  return "Can't determined file type"

}
