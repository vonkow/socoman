(function() {
	// 0 = open, 1 = wall, 2 = block, 3 = area, 4 = char, 5 = block in area
	var lvls = [
		[
			[1,1,1,1,1,1],
			[1,1,0,0,1,1],
			[1,4,2,0,1,1],
			[1,1,2,0,1,1],
			[1,1,0,2,0,1],
			[1,3,2,0,0,1],
			[1,3,3,5,3,1],
			[1,1,1,1,1,1]
		]
	];
	function start() {
		rw.init(96,128).setFPS(30);
		//call make level;
	};

	function makeMan(tX,tY,dir) {
		this.base = new rw.newEnt('sokoman', dir+'.png', 16, 16);
		this.dir = dir;
		this.keyDelay = 0;
		this.tX = tX;
		this.tY = tY;
		this.update = function() {
			if (this.keyDelay==0) {
				if (rw.key('ua')) {
				} else if (rw.key('da')) {
				} else if (rw.key('ra')) {
				} else if (rw.key('la')) {
				}
			} else {
				this.keyDelay--;
			}
		}
	};
})();
