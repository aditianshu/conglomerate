import faker from 'faker';
import { mockImgAvatar } from '../utils/mockImages';

const posts = 
    {
        id: faker.datatype.uuid(),
        title : "Why does the create-react-app imports restriction outside of src directory?",
        authorName : "Atif Aslam",
        questionDetails : "This is special restriction added by developers of create-react-app. It is implemented in ModuleScopePlugin to ensure files reside in src/. That plugin ensures that relative imports from app's source directory don't reach outside of it. There is no official way to disable this feature except using eject and modify webpack config. But, most features and its updates are hidden into the internals of create-react-app system. If you make eject you will have no more new features and its update. So if you are not ready to manage and configure application included to configure webpack and so on - do not do eject operation. Play by the existing rules - move assets to src or use based on public folder url without import.",
        comments : [
            {
                authorName : "Aditi Anshu",
                avatarUrl: mockImgAvatar(5),
                text : "As white light passes through our atmosphere, tiny air molecules cause it to 'scatter'. The scattering caused by these tiny air molecules (known as Rayleigh scattering) increases as the wavelength of light decreases"
            },
            {
                authorName : "Sri Sreenath",
                avatarUrl: mockImgAvatar(3),
                text : "As white light passes through our atmosphere, tiny air molecules cause it to 'scatter'. The scattering caused by these tiny air molecules (known as Rayleigh scattering) increases as the wavelength of light decreases"
            },
            {
                authorName : "Sreekanth Kumar",
                avatarUrl: mockImgAvatar(2),
                text : "As white light passes through our atmosphere, tiny air molecules cause it to 'scatter'. The scattering caused by these tiny air molecules (known as Rayleigh scattering) increases as the wavelength of light decreases"
            },
        ]
    }


export default posts;