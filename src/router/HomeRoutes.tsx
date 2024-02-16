import { VotePage } from "../components/pages/VotePage";
import { RankingPage } from "../components/pages/RankingPage";

export const homeRoutes = [
    {
        path: "/vote",
        exact: false,
        children: <VotePage />
    },
    {
        path: "/ranking",
        exact: false,
        children: <RankingPage />
    },
]