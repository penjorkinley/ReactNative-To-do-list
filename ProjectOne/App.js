import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInut from "./components/GoalInput";

export default function App() {
  //to make the modal visible or not
  const [modalIsVisible, setModalIsVisible] = useState(false);

  //to add the goals
  const [courseGoals, setCourseGoals] = useState([]);

  //fucntion to open the model page
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  //function to close the model page
  function closeAddGoalHandler() {
    setModalIsVisible(false);
  }

  //fucntion to add the goals in an array and after adding closing the modal page
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    closeAddGoalHandler();
  }

  //function to delete the goal item
  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />

        {/* goalinput component */}
        <GoalInut
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCloseModal={closeAddGoalHandler}
        />
        <View style={styles.goalContainder}>
          {/* to display unlimited set of data, flat list is used */}
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                // goal item component
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
  },

  goalContainder: {
    flex: 5,
  },
});
