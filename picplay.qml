import QtQuick 1.0

import "picplay_f.js" as P

Rectangle {
    width: 360
    height: 360
    Text {
        anchors.centerIn: parent
        text: "Hello World"
    }
    MouseArea {
        anchors.fill: parent
        onClicked: {
            Qt.quit();
        }
    }

    ListModel {
        id: imagelist
    }

    Component {
        id: dlgImages
        Item {
            height: 160
            width: parent.width

            Image {
                id: img
                x:0
                y:0
                source: Thumbnail.Url
                height: Thumbnail.Height
                width: Thumbnail.Width

            }
            Text {
                anchors.left: img.right
                anchors.verticalCenter: img.verticalCenter
                text: Title

            }
        }
    }

    ListView {
        anchors.fill: parent
        model: imagelist
        delegate: dlgImages
        onAtYEndChanged: {
            if (atYEnd) {
                console.log("load more")
                function moreReceived(obj) {
                    P.jsexports.searcher.populateModel(imagelist, obj)
                }

                P.jsexports.searcher.more(moreReceived)


            }
        }

    }

    Component.onCompleted: {
        function gotresults(obj) {
            console.log("R")
            //console.log(obj)
            P.jsexports.searcher.populateModel(imagelist, obj)

        }

        var p = new P.jsexports.ImageSearcher()
        P.jsexports.searcher = p

        p.search("tank", gotresults)
        //ts.search("@vivainio", gotresults)
    }
}
