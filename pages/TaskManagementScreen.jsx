import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, } from 'react-native';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, where, getDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import authService from '../authService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from "expo-checkbox"
import { useFonts } from "expo-font";



import { Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Poppins_400Regular } from "@expo-google-fonts/poppins"
import { Colors } from '../colors/Colors';
import CustomButton from '../components/CustomButton';


const TaskManagementScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState('');
  const [user, setUser] = useState();
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      console.log("currentuser", currentUser);
      console.log("currentuser", currentUser.displayName);
      console.log("currentuser", currentUser.email);

      setUser({
        displayName: currentUser.displayName,
        email: currentUser.email,
      })

      const q = query(collection(db, "notes"), where("userId", "==", currentUser.uid)); 
      const querySnapshot = await getDocs(q);
      const notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesArray);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      if (newNote.trim() !== "") {
        const docRef = await addDoc(collection(db, "notes"), {
          text: newNote,
          userId: currentUser.uid,
        });
        console.log("Note updated successfully");
        Alert.alert("Edit Note", "Note updated successfully");
        console.log("Note written with ID: ", docRef.id);
        setNewNote("");

        fetchData();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleEditNote = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      if (newNote.trim() !== '') {
        const docRef = doc(db, "notes", editNoteId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists() && docSnapshot.data().userId === currentUser.uid) {
          await updateDoc(docRef, { text: newNote });
          setNewNote("");
          setEditMode(false);
          setEditNoteId("");
          console.log("Note updated successfully");
          Alert.alert("Edit Note", "Note updated successfully");
          
          // Refetch notes after editing
          fetchData();
        } else {
          console.error("You don't have permission to edit this note.");
          Alert.alert("Error", "You don't have permission to edit this note.");
        }
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }
      const docRef = doc(db, "notes", noteId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists() && docSnapshot.data().userId === currentUser.uid) {
        await deleteDoc(docRef);
        console.log("Note deleted successfully");
        Alert.alert("Delete Note", "Note deleted successfully");

        fetchData();
      } else {
        console.error("You don't have permission to delete this note.");
        Alert.alert("Error", "You don't have permission to delete this note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "An error occurred while logging out. Please try again.");
    }
  }

  const handleToggleCompletion = async (noteId) => {
    try {
      const updatedNotes = notes.map(note => {
        if (note.id === noteId) {
          return { ...note, completed: !note.completed };
        }
        return note;
      });
      setNotes(updatedNotes);

      const docRef = doc(db, "notes", noteId);
      await updateDoc(docRef, { completed: !notes.find(note => note.id === noteId).completed });
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Poppins_400Regular
  });
  if (!fontsLoaded) {
      return <Text>Loading...</Text>;
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={{ margin: 8 }}
          value={item.completed ? true : false}
          // onValueChange={setChecked}
          onValueChange={() => handleToggleCompletion(item.id)}
          
          color={item.completed ? '#16B862' : undefined}
        />

      </View>
      <Text style={{
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
      }}>{item.text}</Text>
      <View style={styles.buttons}>
        <Icon name='file-document-edit-outline' size={20} onPress={() => { setEditMode(true); setNewNote(item.text); setEditNoteId(item.id); }} />
        <Icon name="delete-outline" size={20} onPress={() => handleDeleteNote(item.id)}/>
      </View>
    </View>
  );

  return (

    <View style={{
      flex: 1,
    }}>
      <View style={{
        backgroundColor: Colors.screenBg,
        flex: 1,
        maxHeight: 250,
        justifyContent: "center",
        alignItems: "center",
      }}>

      {user && (
          <View style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}>
            <Text style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
            }}>{user.displayName}</Text>
            <Text style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 12,
            }}>{user.email}</Text>
          </View>
      )}

      <CustomButton title={"Log Out"} onPress={handleLogout} style={{     
        width: 80,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 12,
        padding: 10,
        // marginTop: 50
      }}/>

      </View>
      <View style={styles.container}>
        
        <TextInput
          style={styles.input}
          onChangeText={setNewNote}
          value={newNote}
          placeholder="Enter note..."
        />
        {editMode ? (
          <Button title="Update" onPress={handleEditNote} />
          // <Icon name='file-document-edit-outline' onPress={handleEditNote} />
        ) : (
          <Button title="Add Note" onPress={handleAddNote} />
        )}
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{
            marginTop: 10,
            paddingBottom: 50,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    backgroundColor: "#F7FAFC",
  },
  checkboxContainer: {
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: "center",
  },
});

export default TaskManagementScreen;
