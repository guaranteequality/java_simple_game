var Obstacle = function(posX, posY, init_direct, width, height = 100){
    
    this.x = posX;
    this.y = posY;

    this.direction = init_direct; //0: up, 1: right, 2: down, 3: left
    
    var _self = this;
    var dest_posX = 0;
    var dest_posY = 0;
    
    this.move = function(){
        switch(_self.direction){
            case 0:
                dest_posX = _self.x;
                dest_posY = _self.y - 10;
                break;
            case 2:
                dest_posX = _self.x;
                dest_posY = _self.y + 10;
                break;
            default:
                break;
        }
        if(dest_posY <= 40 || dest_posY >= 960 - 40 - height)
        {
            if(_self.direction == 0) _self.direction = 2;
            else if(_self.direction == 2) _self.direction = 0;
        }
        _self.x = dest_posX;
        _self.y = dest_posY;
    
    }

    this.startMoving = function(){
        setInterval(_self.move,50);
    }

    _self.startMoving();
}