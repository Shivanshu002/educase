import { StyleSheet, TextInput } from "react-native";

export const Input = ({
    label,
    value,
    onChange,
    secure,
    keyboard,
}: {
    label: string;
    value: string;
    onChange: (text: string) => void;
    secure?: boolean;
    keyboard?: any;
}) => (
    <TextInput
        placeholder={label}
        style={styles.input}
        value={value}
        secureTextEntry={secure}
        keyboardType={keyboard}
        onChangeText={onChange}
    />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
});