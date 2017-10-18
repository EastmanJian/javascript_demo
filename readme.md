# Deployment Note

## 1. external java lib.
The project has the following external java lib dependencies.  
    - gson-2.8.2.jar (used by TIY function)  
    It can be get from "http://central.maven.org/maven2/com/google/code/gson/gson/2.8.2/gson-2.8.2.jar"  

Two ways to deploy the external lib to server (e.g. glassfish).  
**Method 1**. upload the java to the server lib folder  
e.g. for GlassFish, update to {domain_dir}/lib, restart the server domain.   
The jar is accessible by domain scope  
  
**Method 2**. deploy the lib with the project artifacts  
e.g. in IntelliJ  
In Project Structure > Artifacts > Output Layout, add the jar under WEB-INF/lib, and deploy by IntelliJ.
after deployment, The jar is accessible by app scope.  
ref: OneNote > Web Servers > GlassFish > Deployment for external java library  


## 2. the following path will be created at server side automatically if they do not exist
They are used by TIY save and load function. 
mkdir -p /srv/www/htdocs/userfiles
mkdir -p /srv/www/htdocs/userfiles/recyclebin

## 3. the JSP JIT-compiler should be in version 1.7 or above.  
 e.g. glassfish 4.x  
{domain-dir}/config/default_web.xml, search for <servlet-name>jsp</servlet-name> tag, append the following xml codes. Restart the server domain.  

    1. <init-param>  
    2.         <param-name>compilerSourceVM</param-name>  
    3.         <param-value>1.8</param-value>  
    4. </init-param>  
    5. <init-param>  
    6.         <param-name>compilerTargetVM</param-name>  
    7.         <param-value>1.8</param-value>  
    8. </init-param>  

ref: OneNote > Web Servers > GlassFish > TS: jsp compiler version, compilerSourceVM compilerTargetVM 

