import javax.swing.JFrame;

public class SnakeGame {

    public static void main(String[] args) {
        JFrame frame = new JFrame();
        GamePanel panel = new GamePanel();

        frame.add(panel);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setTitle("Snake Game");
        frame.pack();
        frame.setVisible(true);
        frame.setLocationRelativeTo(null);
    }
}