(function() {
	// 0 = open, 1 = wall, 2 = block, 3 = area, 4 = char, 5 = block in area, 6=void 7=char in area

	var lvls = [
		[
			[6,1,1,1,1,6],
			[1,1,0,0,1,6],
			[1,4,2,0,1,6],
			[1,1,2,0,1,1],
			[1,1,0,2,0,1],
			[1,3,2,0,0,1],
			[1,3,3,5,3,1],
			[1,1,1,1,1,1]
		]
	];
	function game(lData) {
		var that = this,
			tX = 1,
			tY = 1,
			keyDelay = 0;
		this.lvl = [];
		for (var y=0; y<lData.length; y++) {
			this.lvl.push([]);
			for (var x=0; x<lData[0].length; x++) {
				this.lvl[y].push(lData[y][x]);
				if ((lData[y][x]==4)||(lData[y][x]==7)) {
					tX = x;
					tY = y;
				}
			}
		}
		function checkMove(d) {
			if (d=='u') {
				// square and square above
				var c = that.lvl[tY][tX],
					t = that.lvl[tY-1][tX];
				// if targ empty or goal
				if ((t==0)||(t==3)) {
					that.lvl[tY][tX]-=4;
					that.lvl[tY-1][tX]+=4;
					tY-=1;
				// elif box or boxgoal
				} else if ((t==2)||(t==5)) {
					// square past square above
					var t1 = that.lvl[tY-2][tX];
					// if empty or goal
					if ((t1==0)||(t1==3)) {
						that.lvl[tY][tX]-=4;
						that.lvl[tY-1][tX]+=2;
						that.lvl[tY-2][tX]+=2;
						tY-=1;
					}
				}
			} else if (d=='d') {
				// square and square above
				var c = that.lvl[tY][tX],
					t = that.lvl[tY+1][tX];
				// if targ empty or goal
				if ((t==0)||(t==3)) {
					that.lvl[tY][tX]-=4;
					that.lvl[tY+1][tX]+=4;
					tY+=1;
				// elif box or boxgoal
				} else if ((t==2)||(t==5)) {
					// square past square above
					var t1 = that.lvl[tY+2][tX];
					// if empty or goal
					if ((t1==0)||(t1==3)) {
						that.lvl[tY][tX]-=4;
						that.lvl[tY+1][tX]+=2;
						that.lvl[tY+2][tX]+=2;
						tY+=1;
					}
				}
			} else if (d=='l') {
				// square and square above
				var c = that.lvl[tY][tX],
					t = that.lvl[tY][tX-1];
				// if targ empty or goal
				if ((t==0)||(t==3)) {
					that.lvl[tY][tX]-=4;
					that.lvl[tY][tX-1]+=4;
					tX-=1;
				// elif box or boxgoal
				} else if ((t==2)||(t==5)) {
					// square past square above
					var t1 = that.lvl[tY][tX-2];
					// if empty or goal
					if ((t1==0)||(t1==3)) {
						that.lvl[tY][tX]-=4;
						that.lvl[tY][tX-1]+=2;
						that.lvl[tY][tX-2]+=2;
						tX-=1;
					}
				}
			} else if (d=='r') {
				// square and square above
				var c = that.lvl[tY][tX],
					t = that.lvl[tY][tX+1];
				// if targ empty or goal
				if ((t==0)||(t==3)) {
					that.lvl[tY][tX]-=4;
					that.lvl[tY][tX+1]+=4;
					tX+=1;
				// elif box or boxgoal
				} else if ((t==2)||(t==5)) {
					// square past square above
					var t1 = that.lvl[tY][tX+2];
					// if empty or goal
					if ((t1==0)||(t1==3)) {
						that.lvl[tY][tX]-=4;
						that.lvl[tY][tX+1]+=2;
						that.lvl[tY][tX+2]+=2;
						tX+=1;
					}
				}
			}
		}
		this.base = new rw.Rule(true,2);
		this.rule = function() {
			if (keyDelay==0) {
				(rw.key('ua')) ? (checkMove('u'), keyDelay=5) :
				(rw.key('da')) ? (checkMove('d'), keyDelay=5) :
				(rw.key('ra')) ? (checkMove('r'), keyDelay=5) :
				(rw.key('la')) ? (checkMove('l'), keyDelay=5) : true;
			} else {
				keyDelay--;
			}
		}
	}

	function square(tY,tX) {
		this.base = new rw.Ent(tY+'_'+tX, 'wall', 16, 16);
		this.update = function() {
			var stat = rw.rules['game'].lvl[tY][tX],
				img = 'none';
			if (stat==1) {
				img = 'wall';
			} else if (stat==2) {
				img = 'box';
			} else if (stat==3) {
				img = 'area';
			} else if (stat==4) {
				img = 'u';
			} else if (stat==5) {
				img = 'boxdone';
			} else if (stat==7) {
				img = 'u';
			}
			this.base.changeSprite(img);
		}
	};

	function start() {
		rw.init(96,128).setFPS(30);
		rw.newRule('game', new game(lvls[0]));
		for (var y=0, ylen=lvls[0].length; y<ylen; y++) {
			for (var x=0, xlen=lvls[0][y].length; x<xlen; x++) {
				rw.newEnt(new square(y, x)).base.display(16*x,16*y);
			}
		}
		rw.start();

		//call make level;
	};
	rw.loadSprites({
		'u': ['sprites/d.png',16,16,0,0],
		'd': ['sprites/d.png',16,16,0,0],
		'l': ['sprites/d.png',16,16,0,0],
		'r': ['sprites/d.png',16,16,0,0],
		'none': ['sprites/none.png',16,16,0,0],
		'area': ['sprites/area.png',16,16,0,0],
		'box': ['sprites/box.png',16,16,0,0],
		'boxdone': ['sprites/boxdone.png',16,16,0,0],
		'wall': ['sprites/wall.png',16,16,0,0],
	}, function() {
		start();
	});
})();
