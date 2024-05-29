import { constants } from 'utils/constants';
import * as fs from 'fs';
import * as path from 'path';

export default class {
  private workDir = constants.UPLOAD_LOCATION;

  createAlumniFolder(createdUser: any) {
    const dir = path.join(this.workDir, String(createdUser.id));
    if (fs.existsSync(dir)) return false;
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }

  createAlumniProfileFolder(createdUser: any) {
    const dir = path.join(this.workDir, String(createdUser.id), '/avatar');
    if (fs.existsSync(dir)) return false;
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }

  createAlumniCertificateFolder(createdUser: any) {
    const dir = path.join(
      this.workDir,
      String(createdUser.userId),
      '/skillCertificates',
    );
    if (fs.existsSync(dir)) return false;
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }

  createAlumniAcademicsFolder(createdUser: any) {
    const dir = path.join(
      this.workDir,
      String(createdUser.userId),
      '/academicCertificates',
    );
    if (fs.existsSync(dir)) return false;
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }

  createAlumniResumeFolder(createdUser: any) {
    const dir = path.join(
      this.workDir,
      String(createdUser.userId),
      '/profileResume',
    );
    if (fs.existsSync(dir)) return false;
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }

  removeFolderOrFile(path: string) {
    if (!fs.existsSync(path)) return false;
    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
      fs.rmSync(path, { recursive: true, force: true });
      return true;
    }
    fs.unlink(path, function (err) {
      if (err) console.log(err);
      console.log('File deleted!');
    });
    return true;
  }

  createGeneralFolder(pathOfFolder: string) {
    const dir = path.join(this.workDir, pathOfFolder);
    if (fs.existsSync(dir)) return false;
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }
}
