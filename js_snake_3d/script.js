let scene, camera, renderer, snakeCube, appleCube;
let snakeBody = [];
let snakeLength = 3;
let direction = new THREE.Vector3(1, 0, 0);
let nextDirection = new THREE.Vector3(1, 0, 0);
let applePosition = new THREE.Vector3();
let speed = 7;
let moveInterval;
let gridSize = 40;
let unitSize = 1;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, -20, 20); // Adjusted for a tilted view
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 20, 20);
    light.castShadow = true;
    scene.add(light);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.ShadowMaterial({opacity: 0.3});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -1;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Walls
    const wallMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    createWall(gridSize / 2, 0, wallMaterial); // Right
    createWall(-gridSize / 2, 0, wallMaterial); // Left
    createWall(0, gridSize / 2, wallMaterial, true); // Top
    createWall(0, -gridSize / 2, wallMaterial, true); // Bottom

    // Snake head
    const geometry = new THREE.BoxGeometry(unitSize, unitSize, unitSize);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    snakeCube = new THREE.Mesh(geometry, material);
    snakeCube.castShadow = true;
    scene.add(snakeCube);

    // Apple
    const appleMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    appleCube = new THREE.Mesh(geometry, appleMaterial);
    appleCube.castShadow = true;
    resetApple();
    scene.add(appleCube);

    window.addEventListener('keydown', onKeyDown, false);

    moveInterval = setInterval(moveSnake, 1000 / speed);

    animate();
}

function createWall(x, y, material, horizontal = false) {
    const wallGeometry = horizontal ? new THREE.BoxGeometry(gridSize, 1, 1) : new THREE.BoxGeometry(1, gridSize, 1);
    const wall = new THREE.Mesh(wallGeometry, material);
    wall.position.set(x, y, 0.5);
    scene.add(wall);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function moveSnake() {
    direction.copy(nextDirection);
    snakeCube.position.add(direction);
    snakeCube.position.x = Math.round(snakeCube.position.x);
    snakeCube.position.y = Math.round(snakeCube.position.y);

    // Move snake body
    if (snakeBody.length >= snakeLength) {
        const tailPart = snakeBody.shift();
        scene.remove(tailPart);
    }

    const newPart = snakeCube.clone();
    snakeBody.push(newPart);
    scene.add(newPart);

    checkCollisions();
}

function resetApple() {
    applePosition.set(Math.floor((Math.random() - 0.5) * (gridSize - 2)) + 1, Math.floor((Math.random() - 0.5) * (gridSize - 2)) + 1, 0);
    appleCube.position.copy(applePosition);
}

function checkCollisions() {
    // Check apple collision
    if (snakeCube.position.distanceTo(applePosition) < 1) {
        snakeLength++;
        resetApple();
    }
    // Check wall collision
    if (Math.abs(snakeCube.position.x) >= gridSize / 2 || Math.abs(snakeCube.position.y) >= gridSize / 2) {
        console.log('Game Over');
        clearInterval(moveInterval);
    }
}

function onKeyDown(event) {
    switch(event.keyCode) {
        case 37: // left
            nextDirection.set(-1, 0, 0);
            break;
        case 38: // up
            nextDirection.set(0, 1, 0);
            break;
        case 39: // right
            nextDirection.set(1, 0, 0);
            break;
        case 40: // down
            nextDirection.set(0, -1, 0);
            break;
    }
}

init();