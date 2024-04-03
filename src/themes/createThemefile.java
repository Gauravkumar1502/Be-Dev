import java.io.FileWriter;
import java.io.IOException;

/**
 * createThemefile
 */
public class createThemefile {

    public static void main(String[] args) {
        String[] content = {
            "primeng/resources/themes/bootstrap4-light-blue/theme.css",
            "primeng/resources/themes/bootstrap4-light-purple/theme.css",
            "primeng/resources/themes/bootstrap4-dark-blue/theme.css",
            "primeng/resources/themes/bootstrap4-dark-purple/theme.css",
            "primeng/resources/themes/md-light-indigo/theme.css",
            "primeng/resources/themes/md-light-deeppurple/theme.css",
            "primeng/resources/themes/md-dark-indigo/theme.css",
            "primeng/resources/themes/md-dark-deeppurple/theme.css",
            "primeng/resources/themes/mdc-light-indigo/theme.css",
            "primeng/resources/themes/mdc-light-deeppurple/theme.css",
            "primeng/resources/themes/mdc-dark-indigo/theme.css",
            "primeng/resources/themes/mdc-dark-deeppurple/theme.css",
            "primeng/resources/themes/fluent-light/theme.css",
            "primeng/resources/themes/lara-light-blue/theme.css",
            "primeng/resources/themes/lara-light-indigo/theme.css",
            "primeng/resources/themes/lara-light-purple/theme.css",
            "primeng/resources/themes/lara-light-teal/theme.css",
            "primeng/resources/themes/lara-dark-blue/theme.css",
            "primeng/resources/themes/lara-dark-indigo/theme.css",
            "primeng/resources/themes/lara-dark-purple/theme.css",
            "primeng/resources/themes/lara-dark-teal/theme.css",
            "primeng/resources/themes/soho-light/theme.css",
            "primeng/resources/themes/soho-dark/theme.css",
            "primeng/resources/themes/viva-light/theme.css",
            "primeng/resources/themes/viva-dark/theme.css",
            "primeng/resources/themes/mira/theme.css",
            "primeng/resources/themes/nano/theme.css",
            "primeng/resources/themes/saga-blue/theme.css",
            "primeng/resources/themes/saga-green/theme.css",
            "primeng/resources/themes/saga-orange/theme.css",
            "primeng/resources/themes/saga-purple/theme.css",
            "primeng/resources/themes/vela-blue/theme.css",
            "primeng/resources/themes/vela-green/theme.css",
            "primeng/resources/themes/vela-orange/theme.css",
            "primeng/resources/themes/vela-purple/theme.css",
            "primeng/resources/themes/arya-blue/theme.css",
            "primeng/resources/themes/arya-green/theme.css",
            "primeng/resources/themes/arya-orange/theme.css",
            "primeng/resources/themes/arya-purple/theme.css",
            "primeng/resources/themes/nova/theme.css",
            "primeng/resources/themes/nova-alt/theme.css",
            "primeng/resources/themes/nova-accent/theme.css",
            "primeng/resources/themes/luna-amber/theme.css",
            "primeng/resources/themes/luna-blue/theme.css",
            "primeng/resources/themes/luna-green/theme.css",
            "primeng/resources/themes/luna-pink/theme.css",
            "primeng/resources/themes/rhea/theme.css"
        };
        for (String string : content) {
            String[] split = string.split("/");
            String fileName = split[split.length - 2] + ".css";
            System.out.println(fileName);
            writeToFile(fileName, string);
        }
    }

    public static void writeToFile(String fileName, String fileContent) {
        try {
            FileWriter myWriter = new FileWriter(fileName);
            myWriter.write("@import \"" + fileContent+ "\"");
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

}