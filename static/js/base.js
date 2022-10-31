export class KOF{
    constructor(id){
        this.$kof = $('#'+id);

        $('#'+id).css({
            "width":window.innerWidth,
            "height":window.innerHeight,
            "background-image": "url('/static/images/background/0.gif')",
            "background-size": "100% 100%",
            "background-position": "top",
            "position": "absolute",
        })
    }

}