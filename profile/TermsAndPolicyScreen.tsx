import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Paragraph } from "react-native-paper";

const TermsAndPolicyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Paragraph>
          By using this application, you agree to the following terms and
          policies. This application is intended for use as a social media
          platform where users can connect and interact with others. You must be
          at least 13 years old to use this application. You agree to provide
          accurate and truthful information when creating an account.
        </Paragraph>
        <Paragraph>
          We respect your privacy and will only collect and use your personal
          information as outlined in our Privacy Policy. You are responsible for
          all actions taken using your account, and you agree not to engage in
          any illegal or harmful activities while using this application. We
          reserve the right to suspend or terminate your account if you violate
          these terms or engage in any prohibited activities.
        </Paragraph>
        <Paragraph>
          This application allows users to select and display items from
          provided lists. Please note that these lists may not be comprehensive
          and may not include all possible items. We are not liable for any
          omissions or the inability to find specific items within these lists.
          By using this application, you acknowledge and accept that the
          provided lists are not exhaustive and may be incomplete.
        </Paragraph>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default TermsAndPolicyScreen;
