/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`mb-3 font-psemibold text-lg ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`focus:border-primary-500 relative flex flex-row items-center justify-start rounded-full border border-neutral-100 bg-neutral-100 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`ml-4 h-6 w-6 ${iconStyle}`} />
            )}
            <TextInput
              className={`flex-1 rounded-full p-4 font-psemibold text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;

