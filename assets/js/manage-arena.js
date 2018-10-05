var Arena = function(ctx){

    this.width_arena = 24;
    this.height_arena = 24;
    this.ctx = ctx;

    this.player = null;
    this.obstacles = [];
    this.coins = [];

    this.gameState = "playing"

    var _self = this;
    

    var imgWall = document.getElementById('wall');
    var imgfloor = document.getElementById('floor');
    var imgPlayerUp = document.getElementById('player-up');
    var imgPlayerRight = document.getElementById('player-right');
    var imgPlayerDown = document.getElementById('player-down');
    var imgPlayerLeft = document.getElementById('player-left');
    var imgCoin = document.getElementById('coin');
    var imgObstacle = document.getElementById('obstacle');

    var obstacle_width = 40;
    var Obstacle_height = 150;

    var player_width = 40;
    var player_height = 60;

    this.drawBoard = function(){
        _self.ctx.clearRect(0,0,960,960);
        for(var i = 0 ; i < _self.height_arena ; i++){
            for(var j = 0 ; j < _self.width_arena ; j++){
                switch(arena_data[i][j])
                {
                    case 0:
                        _self.ctx.drawImage(imgfloor, j*unitPixel, i*unitPixel, unitPixel, unitPixel);
                        break;
                    case 1:
                        _self.ctx.drawImage(imgWall, j*unitPixel, i*unitPixel, unitPixel, unitPixel);
                        break;
                }
            }
        }

        _self.player = new Player(_self.ctx, 400, 700, player_width, player_height);
        _self.obstacles.push(new Obstacle(300, 200, 0, obstacle_width, Obstacle_height));
        _self.obstacles.push(new Obstacle(700, 200, 2, obstacle_width, Obstacle_height));

        _self.drawArena();

    }

    this.drawArena = function(){
        _self.ctx.clearRect(0,0,960,960);
        for(var i = 0 ; i < _self.height_arena ; i++){
            for(var j = 0 ; j < _self.width_arena ; j++){
                switch(arena_data[i][j])
                {
                    case 0:
                        _self.ctx.drawImage(imgfloor, j*unitPixel, i*unitPixel, unitPixel, unitPixel);
                        break;
                    case 1:
                        _self.ctx.drawImage(imgWall, j*unitPixel, i*unitPixel, unitPixel, unitPixel);
                        break;
                    case 2:
                        _self.ctx.drawImage(imgfloor, j*unitPixel, i*unitPixel, unitPixel, unitPixel);

                        ret = _self.player.IsCollide(j*unitPixel, i*unitPixel, unitPixel-10, unitPixel-10);

                        if(ret == true){
                            arena_data[i][j] = 0;
                            console.log('item ++');
                            console.log(Math.random());
                            _self.player.CoinCnt += 1;

                            tmpi = Math.floor((Math.random()*100)%20) + 1;
                            tmpj = Math.floor((Math.random()*100)%20) + 1;
                            if(tmpi >= 24) tmpi -= 3;
                            if(tmpj >= 24) tmpj -= 3;
                            arena_data[tmpi][tmpj] = 2;
                        }
                        _self.ctx.drawImage(imgCoin, j*unitPixel, i*unitPixel, unitPixel, unitPixel);
                        break;
                }
            }
        }

        switch(_self.player.direction)
        {
            case 0:
                _self.ctx.drawImage(imgPlayerUp, _self.player.x, _self.player.y, player_width, player_height);
                break;
            case 1:
                _self.ctx.drawImage(imgPlayerRight, _self.player.x, _self.player.y, player_height, player_width);
                break;
            case 2:
                _self.ctx.drawImage(imgPlayerDown, _self.player.x, _self.player.y, player_width, player_height);
                break;
            case 3:
                _self.ctx.drawImage(imgPlayerLeft, _self.player.x, _self.player.y, player_height, player_width);
                break;
            default:
                break;
        }

        _self.ctx.drawImage(imgObstacle, _self.obstacles[0].x, _self.obstacles[0].y, obstacle_width, Obstacle_height);
        _self.ctx.drawImage(imgObstacle, _self.obstacles[1].x, _self.obstacles[1].y, obstacle_width, Obstacle_height);
        
        var ret = 0;
        ret = _self.player.IsCollide(_self.obstacles[0].x, _self.obstacles[0].y, obstacle_width, Obstacle_height);
        if(ret) _self.player.bAlive = false;
        ret =_self.player.IsCollide(_self.obstacles[1].x, _self.obstacles[1].y, obstacle_width, Obstacle_height);
        if(ret) _self.player.bAlive = false;

        if(_self.player.bAlive == false)
        {
            _self.gameOver();
            return;
        }

        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "black";
        var tmpStr = "Score : " + _self.player.CoinCnt
        ctx.fillText(tmpStr, 820,30 );
        setTimeout(() => {
                _self.drawArena();
            }, 10);
    }

    this.gameOver = function(){
        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Game Over...", canvas.width/2, canvas.height/2 -30);
        
        ctx.font = "40px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("(-_-) Press Space To Restart (-_-)", canvas.width/2, canvas.height/2+30);
    }

}

window.onload = function(){
    var game = new Arena(context);
    game.drawBoard();
}




