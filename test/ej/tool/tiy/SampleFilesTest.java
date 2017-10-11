package ej.tool.tiy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("SampleFiles Access Class")
class SampleFilesTest {

    @Test
    void saveSample() {
        SampleFiles sf = new SampleFiles("c:\\temp");
        String result = "success";
        try {
            sf.saveSample("SampleFileSave"+ (new Date()).getTime(), "some content");
        } catch (IOException e) {
            e.printStackTrace();
            result = "NG";
        }
        assertTrue("success".equals(result));
    }

    @Test
    void getFileList() {
        SampleFiles sf = new SampleFiles("c:\\temp");
        String json = sf.getFileList();
        System.out.println("filelist=" + json);
        assertTrue(true);
    }

    @Test
    void recycleFile() {
        SampleFiles sf = new SampleFiles("c:\\temp", "c:\\temp\\recyclebin");
        String fileName = "SampleFileRecycle"+ (new Date()).getTime();
        String result = "success";
        try {
            sf.saveSample(fileName, "some content");
            sf.recycleFile(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            result = "NG";
        }
        assertTrue("success".equals(result));
    }

}