import { User } from '../modules/user/user.model';

const superAdminInfo = {
  fullName: 'Naimur Rahman',
  username: 'naimur22315',
  role: 'super-admin',
  email: 'naimur@gmail.com',
  password: 'Naimur123@',
  profileImage:
    'https://img.freepik.com/free-photo/handsome-bearded-businessman-rubbing-hands-having-deal_176420-18778.jpg?t=st=1713819104~exp=1713822704~hmac=b45f6e39724080e94939333678ba4579d0139cede50ea87caa3f54f760a9aabc&w=900',
};

const seedSuperAdmin = async () => {
  // check is super admin is exists
  const superAdmin = await User.findOne({ role: 'super-admin' });

  if (!superAdmin) {
    await User.create(superAdminInfo);
  }
};

export default seedSuperAdmin;
