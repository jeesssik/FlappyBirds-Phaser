var mainState = {
preload: function() { 
    // Load the bird sprite
    game.load.image('bird', 'assets/bird.png'); 
    game.load.image('pipe', 'assets/pipe.png');
},

create: function() { 
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#71c5cf';

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.pipes = game.add.group(); 
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);   



    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", 
    { font: "30px Arial", fill: "#ffffff" }); 





    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);    
   


    },

    update: function() {
        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);

        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
    },

    addOnePipe: function(x, y) {
        var pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);

        pipe.body.velocity.x = -200;  
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.addOnePipe(400, i*60+10);   
                this.score += 1;
                this.labelScore.text = this.score;
      
    },




    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },

};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');