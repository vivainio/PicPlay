import QtQuick 1.1
import com.nokia.meego 1.0

Page {
    tools: commonTools

    PicList {
        anchors.fill: parent
        onImageSelected: {
            pageStack.push(fullPicPage)
            fullPicPage.setImage(imageObj)
        }
    }

}
