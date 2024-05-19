import { User } from 'src/users/entities/users.entity';
import { constants } from 'utils/constants';

export default class {
  private fs = require('fs');
  private workDir = constants.UPLOAD_LOCATION;

  createAlumniFolder(createdUser: any) {
    let dir = this.workDir + createdUser.id; //path;
    //console.log(dir);
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
      return true;
    }
    return false;
  }

  createAlumniProfileFolder(createdUser: any) {
    let dir = this.workDir + createdUser.id + '/avatar'; //path;
    //console.log(dir);
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
      return true;
    }
    return false;
  }

  createAlumniCertificateFolder(createdUser: any) {
    let dir = this.workDir + createdUser.userId + '/skillCertificates'; //path;
    //console.log(dir);
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
      return true;
    }
    return false;
  }

  createAlumniAcademicsFolder(createdUser: any) {
    let dir = this.workDir + createdUser.userId + '/academicCertificates'; //path;
    //console.log(dir);
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
      return true;
    }
    return false;
  }

  createAlumniResumeFolder(createdUser: any) {
    let dir = this.workDir + createdUser.userId + '/profileResume'; //path;
    //console.log(dir);
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
      return true;
    }
    return false;
  }

  removeFolderOrFile(path: string) {
    if (!this.fs.existsSync(path)) {
      console.log('Path dosent Exist:' + path);
      return false;
    }
    const stats = this.fs.statSync(path);
    // check if directory
    if (stats.isDirectory()) {
      // true
      this.fs.rmSync(path, { recursive: true, force: true }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(path + ' Deleted!');
        }
      });
      return true;
    } else {
      this.fs.unlink(path, function (err) {
        if (err) console.log(err);
        // if no error, file has been deleted successfully
        console.log('File deleted!');
      });
      return true;
    }
  }

  createGeneralFolder(path: string) {
    let dir = this.workDir + path;
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir, { recursive: true });
      return true;
    }
    return false;
  }
}
