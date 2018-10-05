var Player = function(ctx, posX, posY, pWidth, pHeight){
    this.x = posX;
    this.y = posY;
    this.CoinCnt =0;
    this.direction = 0; // up: 0, right: 1, down: 2, left: 3
    this.bAlive = true;
    this.pWidth = pWidth;
    this.pHeight = pHeight;

    var _self = this;
    var dest_posX = 0;
    var dest_posY = 0;

    var imgPlayer = document.getElementById('player');

    this.move = function(){
        if(_self.bAlive == false) return false;
        switch(_self.direction){
            case 0: // Up
                dest_posX = _self.x;
                dest_posY = _self.y - 5;
                break;
            case 1: // Right
                dest_posX = _self.x + 5;
                dest_posY = _self.y;
                break;
            case 2: // Down
                dest_posX = _self.x;
                dest_posY = _self.y + 5;
                break;
            case 3: // Left
                dest_posX = _self.x - 5;
                dest_posY = _self.y;
                break;
            default:
                break;
        }

        if(dest_posX <= unitPixel - 4 || dest_posY <= unitPixel - 4 || 
           dest_posX >= (960 - unitPixel - pHeight + 4) || dest_posY >= (960 -unitPixel - pHeight + 4))
        {
            _self.bAlive = false;
            return false;
        }
        _self.x = dest_posX;
        _self.y = dest_posY;
    }

    document.onkeydown = function(event)
    {
        var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
        
        var LEFT = 65; // a keyboard
        var RIGHT = 68; // d keybord
        var LEFT_ARROW = 37;
        var RIGHT_ARROW = 39;
        var bArrow = false
        var SPACEBAR = 32;

        switch(keycode)
        {
            case LEFT:
                _self.direction -= 1;
                if(_self.direction < 0) _self.direction =3;
                bArrow = true
                break;
            case LEFT_ARROW:
                _self.direction -= 1;
                if(_self.direction < 0) _self.direction =3;
                bArrow = true
                break;
            case RIGHT:
                _self.direction += 1;
                if(_self.direction > 3) _self.direction =0;
                bArrow = true
                break;
            case RIGHT_ARROW:
                _self.direction += 1;
                if(_self.direction > 3) _self.direction =0;
                bArrow = true
                break;
            case SPACEBAR:
                location.reload();
        }
        if(bArrow == true)
        {   
            tmp = _self.pWidth;
            _self.pWidth = _self.pHeight;
            _self.pHeight = tmp;
        }
    }


    this.IsCollide = function(objX, objY, objW, objH){

        if(_self.x >= objX && _self.x <= objX + objW && _self.y >=objY && _self.y <= (objY + objH))
        {
            return true;
        }
        else if(_self.x >= objX && _self.x <= objX + objW && (_self.y+_self.pHeight) >=objY && (_self.y+_self.pHeight) <= (objY + objH)) {
            return true;
        }
        else if((_self.x+_self.pWidth) >= objX && (_self.x+_self.pWidth)<= (objX + objW) && _self.y >=objY && _self.y <= (objY + objH)) {
            return true;
        }
        else if((_self.x+_self.pWidth) >= objX && (_self.x+_self.pWidth)<= (objX + objW) && (_self.y+_self.pHeight)>=objY && (_self.y+_self.pHeight) <= (objY + objH)) {
            return true;
        }
        
        return false;
    }

    this.startMoving = function(){
        setInterval(_self.move,50);
    }

    _self.startMoving();
}