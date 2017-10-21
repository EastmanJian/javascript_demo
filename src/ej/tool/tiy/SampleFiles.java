package ej.tool.tiy;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

/**
 * Handling TIY(Try It Yourself) tool's server side sample files.
 */
public class SampleFiles {
    private String filePath;
    private String recyclePath;

    public SampleFiles() {
        this("/srv/www/htdocs/userfiles");
    }

    /**
     * Constructor
     * @param filePath - storage path for user files
     */
    public SampleFiles(String filePath) {
        this(filePath, "/srv/www/htdocs/userfiles/recyclebin");
    }

    /**
     * Constructor
     * @param filePath - storage path for user files
     * @param recyclePath - recycle bin path
     */
    public SampleFiles(String filePath, String recyclePath) {
        this.filePath = filePath;
        this.recyclePath = recyclePath;
    }

    /**
     * Save user file to filePath.
     * If filePath does not exists, create it.
     * @param filename - the name of the file
     * @param codes - the content of the file
     * @throws IOException
     */
    public void saveSample(String filename, String codes) throws IOException {
        System.out.println("saveSample: " + filePath + File.separator + filename + ".html");
        File sampleDir = new File(filePath);
        if (!sampleDir.exists()) {
            sampleDir.mkdir();
        }
        File sampleFile = new File(filePath + File.separator + filename + ".html");
        if (!sampleFile.exists()) {
            sampleFile.createNewFile();
        } else {
            throw new IOException("Duplicated file name!");
        }

        OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(sampleFile), StandardCharsets.UTF_8);
        out.write(codes);
        out.close();
    }

    /**
     * Get the user file list
     * @return - list of user files in json format.
     */
    public String getFileList() {
        System.out.println("getFileList");
        String[] files;
        File dir = new File(filePath);
        files = dir.list();
        List<String> fileList = new ArrayList<>();
        for (String filename: files) {
            if (filename.endsWith(".html")) {
                fileList.add(filename);
            }
        }
        String[] htmlFiles = fileList.toArray(new String[0]);
        Arrays.sort(htmlFiles);

        Gson gson = new Gson();
        String json = gson.toJson(htmlFiles);
        return json;
    }

    /**
     * recycle the sample file. Move it to the recycle folder.
     * @param fileName
     */
    public void recycleFile(String fileName) throws IOException {
        fileName = fileName + ".html";
        File recycleDir = new File(recyclePath);
        if (!recycleDir.exists()) {
            recycleDir.mkdir();
        }
        Path source = FileSystems.getDefault().getPath(filePath, fileName);
        Path target = FileSystems.getDefault().getPath(recyclePath, fileName);
        System.out.println("recycle file " + source + " to " + target);
        Files.move(source, target, REPLACE_EXISTING);
    }
}
