(function() {
	// 0 = open, 1 = wall, 2 = block, 3 = area, 4 = char, 5 = block in area, 6=void 7=char in area

	var lvls = [
		[
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
		], [
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,1,1,1,1,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,1,1,0,0,1,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,1,4,2,0,1,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,1,1,2,0,1,1,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,1,1,0,2,0,1,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,1,3,2,0,0,1,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,1,3,3,5,3,1,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,1,1,1,1,1,1,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]
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
				var t = that.lvl[tY-1][tX];
				if ((t==0)||(t==3)) {
					that.lvl[tY][tX]-=4;
					that.lvl[tY-1][tX]+=4;
					tY-=1;
				} else if ((t==2)||(t==5)) {
					var t1 = that.lvl[tY-2][tX];
					if ((t1==0)||(t1==3)) {
						that.lvl[tY][tX]-=4;
						that.lvl[tY-1][tX]+=2;
						that.lvl[tY-2][tX]+=2;
						tY-=1;
					}
				}
			} else if (d=='d') {
				var t = that.lvl[tY+1][tX];
				if ((t==0)||(t==3)) {
					that.lvl[tY][tX]-=4;
					that.lvl[tY+1][tX]+=4;
					tY+=1;
				} else if ((t==2)||(t==5)) {
					var t1 = that.lvl[tY+2][tX];
					if ((t1==0)||(t1==3)) {
						that.lvl[tY][tX]-=4;
						that.lvl[tY+1][tX]+=2;
						that.lvl[tY+2][tX]+=2;
						tY+=1;
					}
				}
			} else if (d=='l') {
				var t = that.lvl[tY][tX-1];
				if ((t==0)||(t==3)) {
					that.lvl[tY][tX]-=4;
					that.lvl[tY][tX-1]+=4;
					tX-=1;
				} else if ((t==2)||(t==5)) {
					var t1 = that.lvl[tY][tX-2];
					if ((t1==0)||(t1==3)) {
						that.lvl[tY][tX]-=4;
						that.lvl[tY][tX-1]+=2;
						that.lvl[tY][tX-2]+=2;
						tX-=1;
					}
				}
			} else if (d=='r') {
				// square and square above
				var t = that.lvl[tY][tX+1];
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
		this.base = new rw.Rule(true,0);
		this.rule = function() {
			if (keyDelay==0) {
				(rw.key('ua')) ? (checkMove('u'), keyDelay=5) :
				(rw.key('da')) ? (checkMove('d'), keyDelay=5) :
				(rw.key('ra')) ? (checkMove('r'), keyDelay=5) :
				(rw.key('la')) ? (checkMove('l'), keyDelay=5) : true;
			} else {
				keyDelay--;
			}
			var victory = true;
			for (var y=0, ylen=this.lvl.length; y<ylen; y++) {
				for (var x=0, xlen=this.lvl.length; x<xlen; x++) {
					if (this.lvl[y][x]==2) victory = false;
				}
			}
			if (victory) {
				if (curLvl<lvls.length-1){
					alert("Level "+(curLvl+1)+" vanquished!");
					makeGame(++curLvl);
				} else {
					rw.stop(function() {
						alert('victory is yours!');
					});
				}
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
				img = 'man';
			} else if (stat==5) {
				img = 'boxdone';
			} else if (stat==7) {
				img = 'manarea';
			}
			this.base.changeSprite(img);
		}
	};

	function makeGame(lv) {
		rw.stop(function() {
			rw.wipeAll();
			rw.newRule('game', new game(lvls[lv]));
			for (var y=0, ylen=lvls[lv].length; y<ylen; y++) {
				for (var x=0, xlen=lvls[lv][y].length; x<xlen; x++) {
					rw.newEnt(new square(y, x)).base.display(16*x,16*y);
				}
			}
			rw.start();
		});
	}

	var curLvl = 0;
	function start() {
		rw.init(320,240).setFPS(30);
		rw.start();
		makeGame(curLvl);
	};
	rw.loadSprites({
		'man': ['sprites/man.png',16,16,0,0],
		'manarea': ['sprites/manarea.png',16,16,0,0],
		'none': ['sprites/none.png',16,16,0,0],
		'area': ['sprites/area.png',16,16,0,0],
		'box': ['sprites/box.png',16,16,0,0],
		'boxdone': ['sprites/boxdone.png',16,16,0,0],
		'wall': ['sprites/wall.png',16,16,0,0],
	}, function() {
		start();
	});
})();
