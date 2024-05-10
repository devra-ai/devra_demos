import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import javax.swing.Timer;

public class GamePanel extends JPanel implements ActionListener {

    private final int SCREEN_SIZE = 600;
    private final int TILE_SIZE = 30;
    private final int GAME_SIZE = SCREEN_SIZE / TILE_SIZE;
    private final int DELAY = 100;

    private final int x[] = new int[GAME_SIZE * GAME_SIZE];
    private final int y[] = new int[GAME_SIZE * GAME_SIZE];

    private int bodyParts = 6;
    private int applesEaten;
    private int appleX;
    private int appleY;
    private char direction = 'R';
    private boolean running = false;
    private Timer timer;

    public GamePanel() {
        this.setPreferredSize(new Dimension(SCREEN_SIZE, SCREEN_SIZE));
        this.setBackground(Color.black);
        this.setFocusable(true);
        this.addKeyListener(new MyKeyAdapter());
        startGame();
    }

    public void startGame() {
        newApple();
        running = true;
        timer = new Timer(DELAY, this);
        timer.start();
    }

    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        draw(g);
    }

    public void draw(Graphics g) {
        if (running) {
            g.setColor(Color.red);
            g.fillOval(appleX * TILE_SIZE, appleY * TILE_SIZE, TILE_SIZE, TILE_SIZE);

            for (int i = 0; i < bodyParts; i++) {
                if (i == 0) {
                    g.setColor(Color.green);
                    g.fillRect(x[i] * TILE_SIZE, y[i] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                } else {
                    g.setColor(new Color(45,180,0));
                    g.fillRect(x[i] * TILE_SIZE, y[i] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        } else {
            gameOver(g);
        }
    }

    public void newApple() {
        appleX = (int) (Math.random() * GAME_SIZE);
        appleY = (int) (Math.random() * GAME_SIZE);
    }

    public void move() {
        for (int i = bodyParts; i > 0; i--) {
            x[i] = x[i - 1];
            y[i] = y[i - 1];
        }

        switch (direction) {
            case 'U':
                y[0] = y[0] - 1;
                break;
            case 'D':
                y[0] = y[0] + 1;
                break;
            case 'L':
                x[0] = x[0] - 1;
                break;
            case 'R':
                x[0] = x[0] + 1;
                break;
        }
    }

    public void checkApple() {
        if ((x[0] == appleX) && (y[0] == appleY)) {
            bodyParts++;
            applesEaten++;
            newApple();
        }
    }

    public void checkCollisions() {
        // check if head collides with body
        for (int i = bodyParts; i > 0; i--) {
            if ((x[0] == x[i]) && (y[0] == y[i])) {
                running = false;
                break;
            }
        }

        // check if head touches left border
        if (x[0] < 0) {
            running = false;
        }

        // check if head touches right border
        if (x[0] >= GAME_SIZE) {
            running = false;
        }

        // check if head touches top border
        if (y[0] < 0) {
            running = false;
        }

        // check if head touches bottom border
        if (y[0] >= GAME_SIZE) {
            running = false;
        }

        if (!running) {
            timer.stop();
        }
    }

    public void gameOver(Graphics g) {
        // Game Over text
        g.setColor(Color.red);
        g.drawString("Game Over", (SCREEN_SIZE / 2) - 50, SCREEN_SIZE / 2);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (running) {
            move();
            checkApple();
            checkCollisions();
        }
        repaint();
    }

    private class MyKeyAdapter extends KeyAdapter {
        @Override
        public void keyPressed(KeyEvent e) {
            switch (e.getKeyCode()) {
                case KeyEvent.VK_LEFT:
                    if (direction != 'L') {
                        direction = 'L';
                    }
                    break;
                case KeyEvent.VK_RIGHT:
                    if (direction != 'R') {
                        direction = 'R';
                    }
                    break;
                case KeyEvent.VK_UP:
                    if (direction != 'U') {
                        direction = 'U';
                    }
                    break;
                case KeyEvent.VK_DOWN:
                    if (direction != 'D') {
                        direction = 'D';
                    }
                    break;
            }
        }
    }
}