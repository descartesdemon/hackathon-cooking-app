//Make default screen the nested stack navigator
import { Redirect } from "expo-router";

const Index = () => {
	return <Redirect href="/main" />;
};
export default Index;