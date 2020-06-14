import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js';
import { WebView } from 'react-native-webview';
 
export default class pdfViewer extends React.Component {
  render() {
    return (
      <PDFReader
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/hospitalusers-44f06.appspot.com/o/mobile_app-_final_pdf.pdf?alt=media&token=a66ce6ff-a2e3-4dd9-93b8-9c8447c61304',
        }}
      />

    );

  }
}