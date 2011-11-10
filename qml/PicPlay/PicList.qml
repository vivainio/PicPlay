import QtQuick 1.0

import "picplay_gen.js" as P

Item {
    width: 360
    height: 360

    signal imageSelected(variant imageObj)
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
            MouseArea {
                anchors.fill: img
                onClicked: {
                    var obj = imagelist.get(index)
                    console.log("Clicked " + obj)
                    imageSelected(obj)
                }
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
