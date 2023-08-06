const router = express.Router()


router.get('/', authentication, authorization, login)