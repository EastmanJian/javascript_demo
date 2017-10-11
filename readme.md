# Deployment Note:

## 1. external java lib.
The project has the following external java lib dependencies.
    - gson-2.8.2.jar (used by TIY function)

Two ways to deploy the external lib to server (e.g. glassfish).
Method 1. upload the java to the server lib folder
    e.g. for GlassFish, update to {server_root}/glassfish/domains/domain1/lib
The jar is accessible by domain scope

Method 2. In Project Structure > Artifacts > Output Layout, add the jar under WEB-INF/lib, and deploy by IntelliJ.
after deployment, The jar is accessible by app scope.

ref: OneNote > Web Servers > GlassFish > Deployment for external java library


## 2. server path for user save files
create folders (used by TIY function)
mkdir -p /srv/www/htdocs/userfiles
mkdir -p /srv/www/htdocs/userfiles/recyclebin