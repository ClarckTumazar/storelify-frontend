import React, { useRef } from 'react'
import formatFileSize from '../../utils/formatFileSize';


const FileRow = ({file, checkboxClicked}) => {

  const checkboxRef = useRef(null)

  return (
    <tr className='tr-item' key={file.fileid} 
        onClick={(e) => checkboxRef.current.click()}>
      <td className="td-name"><div className="td-name-div">{file.fileName}</div></td>
      <td className="td-type"><div className="td-type-div">{file.fileType}</div></td>
      <td>{formatFileSize(file.fileSize)}</td>
      <td className='td-action'>
      <input 
        className='td-checkbox'
        type='checkbox' 
        ref={checkboxRef}
        //* we need to pass the file object on change to be later deleted in firebase and SQL
        onChange={(e) => checkboxClicked(file)} 
      />
      </td>
   </tr>
  )
}

export default FileRow;