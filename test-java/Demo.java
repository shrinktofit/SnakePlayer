public class Demo{
    public static void main(String[] args) {
        
    }

    public static void drawSnake(Snake snake,int weight,int height){

    }

    public static void screenTest(Snake snake,int weight,int height){
        char chars[][] = new char[100][100];
        for (int i = 0;i < chars.length; i++) {
            for (int j = 0;j < chars[i].length; j++) {
                chars[i][j]='-';
            }
        }

        for (int i = 3; i < 10; i++) {
            chars[4][i]='*';
        }
        for (int i = 0; i < 5; i++) {
            chars[i][3]='*';
        }  
        for (int i = 0;i < chars.length; i++) {
            for (int j = 0;j < chars[i].length; j++) {
                System.out.print(chars[i][j]);
            }
            System.out.println();
        }
    }
}