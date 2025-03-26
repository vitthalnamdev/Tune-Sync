import { createContext, useReducer, useContext } from "react";

// Initial state (empty queue)
const initialState = [];

// Reducer function for managing queue actions
const queueReducer = (state, action) => {
  switch (action.type) {
    case "ENQUEUE":
      return [...state, action.payload]; // Add to end
    case "DEQUEUE":
      return state.length > 0 ? state.slice(1) : state; // Remove first element
    case "CLEAR":
      return []; // Empty the queue
    default:
      return state;
  }
};

// Create context
const QueueContext = createContext();

// QueueProvider component
export const QueueProvider = ({ children }) => {
  const [queue, dispatch] = useReducer(queueReducer, initialState);

  // Queue functions
  const enqueue = (item) => dispatch({ type: "ENQUEUE", payload: item });
  const dequeue = () => dispatch({ type: "DEQUEUE" });
  const clearQueue = () => dispatch({ type: "CLEAR" });
  const peek = () => (queue.length > 0 ? queue[0] : null);
  const size = () => queue.length;

  return (
    <QueueContext.Provider value={{ queue, enqueue, dequeue, peek, size, clearQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

// Custom hook to use queue context
export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
};
