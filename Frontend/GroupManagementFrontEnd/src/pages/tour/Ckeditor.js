import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser,{processNodes,convertNodeToElement,htmlparser2} from 'react-html-parser'



export default function CKEditorData(props) {
  const {dataCKeditor,setDataCKeditor}=props
  // const handleChange=(e,editor)=>{
  //   setDataCKeditor(ReactHtmlParser(editor.getData()))
  // }
  return (
    <div className="App">
    
    <CKEditor
                      editor={ClassicEditor}
                      data={dataCKeditor}
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        editor.editing.view.change((write) => {
                          write.setStyle(
                            "height",
                            "200px",
                            editor.editing.view.document.getRoot()
                          );
                        })
                      }}
                      onChange={(e, editor) =>{
                        //  { handleChange(e,editor)}
                        const data = editor.getData();
                       setDataCKeditor((editor.getData()))

                      }
                    }

                    >
                    </CKEditor>
</div>
  )
}

