public class Snake{
    public Vec2 vec2;
    public SnakeBodySegement[] bodys;

    public Snake(Vec2 vec2,SnakeBodySegement[] bodys){
        this.vec2=vec2;
        this.bodys=bodys;
    }

    public static void main(String[] args) {
        //创建蛇头坐标
        Vec2 vec2 =new Vec2(20,20);
        //创建蛇的身体
        SnakeBodySegement bodys[] = {new SnakeBodySegement(Direction.down, 15),new SnakeBodySegement(Direction.right,20)};

        //创建蛇对象
        Snake snake = new Snake(vec2,bodys);
        System.out.println(snake.bodys);

        // for (int i = 0; i < 10; i++) {
        //     Vec2 vec =new Vec2(20+i,20+i);
        //     SnakeBodySegement bodys1[] = {new SnakeBodySegement(Direction.down, 15),new SnakeBodySegement(Direction.right,20)};
        //     bodys1[0]=new SnakeBodySegement(Direction.down, 15);
        //     bodys1[1]=new SnakeBodySegement(Direction.right,20);
        //     Snake snake1 = new Snake(vec,bodys1);
        // }
    }


    public static void drawSnake(Snake snake,int weight,int height){

    }
}