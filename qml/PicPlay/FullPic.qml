import QtQuick 1.1
import com.nokia.meego 1.0

Page {
    tools: commonTools


    function setImage(obj) {
        var url = obj.MediaUrl
        console.log("set url " + url)
        img.source = url
    }

    Flickable {
        anchors.fill: parent
        contentWidth: img.width
        contentHeight: parent.height
        Image {
            id: img
            fillMode: Image.PreserveAspectFit
        }
    }



}


