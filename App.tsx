import {useEffect} from 'react';
import {createPdf, Page} from 'react-native-images-to-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function App() {
  useEffect(() => {
    const fun = async () => {
      const {scannedImages} = await DocumentScanner.scanDocument({
        maxNumDocuments: 10,
      });

      if (scannedImages?.length) {
        const pages = scannedImages.map<Page>(imagePath => ({imagePath}));

        createPdf({
          pages,
          outputPath: `file://${ReactNativeBlobUtil.fs.dirs.DocumentDir}/file.pdf`,
        })
          .then(path => console.log(`PDF created successfully: ${path}`))
          .catch(error => console.log(`Failed to create PDF: ${error}`));
      }
    };

    fun();
  }, []);

  return null;
}