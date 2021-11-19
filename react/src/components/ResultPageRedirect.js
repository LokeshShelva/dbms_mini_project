import ResultPage from "./Admin/ResultPage/ResultPage";
import TeacherResultPage from "./Teacher/ResultPage/TeacherResultPage";

export default function ResultPageRedirect({ user }) {
    return user.role == 'admin' ? <ResultPage role={user.role}></ResultPage> : <TeacherResultPage user={user}></TeacherResultPage>
}