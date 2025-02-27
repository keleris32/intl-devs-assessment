import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useBet } from "@/context/BetContext";
import { FONTS } from "@/constants/Fonts";
import CustomText from "../CustomText";

const ParlaySlipItems = () => {
	const { selectedBets, removeBet, clearBets } = useBet();

	const [amount, setAmount] = React.useState("");

	const handleAmountChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, "");
		setAmount(numericValue);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => clearBets()} style={styles.deleteButton}>
				<Ionicons name="trash-outline" size={20} color="#B0B0B0" />
			</TouchableOpacity>
			<View style={styles.content}>
				<View style={styles.matchRow}>
					<View style={{ flexDirection: "column", gap: 5 }}>
						<CustomText
							style={styles.matchText}
						>{`${selectedBets[0]?.game?.team1.name} VS ${selectedBets[0]?.game?.team2.name}`}</CustomText>
						<CustomText style={styles.endTime}>
							Ends at:{" "}
							{new Date(
								Number(selectedBets[0]?.game.endTime)
							).toLocaleTimeString()}{" "}
							EST
						</CustomText>
					</View>
					<TextInput
						style={styles.amountInput}
						value={amount}
						onChangeText={handleAmountChange}
						keyboardType="numeric"
						placeholder="$0"
						placeholderTextColor="#ffffff"
					/>
				</View>
				<View
					style={{
						flexDirection: "column",
						gap: 15,
						paddingBottom: 10,
					}}
				>
					{selectedBets?.map((item: any, index: number) => (
						<View
							key={item.game.id}
							style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
						>
							<TouchableOpacity
								onPress={() => removeBet(item.game.id)}
								style={styles.deleteButtonX}
							>
								<Ionicons name="trash-outline" size={18} color="#B0B0B0" />
							</TouchableOpacity>
							<View style={{ gap: 5 }}>
								<CustomText style={styles.teamText}>
									{item.game.team1.name} Win
								</CustomText>
								<CustomText style={styles.teamText2}>
									{item.odds}{" "}
									<CustomText
										style={[
											{
												color: "#FFFFFF1A",
											},
										]}
									>
										(-120)
									</CustomText>
								</CustomText>
							</View>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

export default ParlaySlipItems;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF1A",
		borderRadius: 8,
		marginVertical: 5,
		paddingRight: 12,
		gap: 10,
	},
	deleteButton: {
		padding: 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFFFFF33",
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
	deleteButtonX: {
		padding: 5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFFFFF33",
		borderRadius: 4,
	},
	content: {
		flex: 1,
		justifyContent: "space-between",
		paddingLeft: 10,
		gap: 20,
	},
	matchRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 10,
	},
	matchText: {
		color: "#FFFFFF",
		...FONTS.ps2,
		fontWeight: "600",
	},
	amountInput: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
		minWidth: 80,
		textAlign: "right",
		backgroundColor: "#FFFFFF1A",
		padding: 8,
		borderRadius: 5,
	},
	endTime: {
		color: "#B0B0B0",
		...FONTS.ps3,
	},
	teamText: {
		color: "#FFFFFF",
		...FONTS.ps2,
		fontWeight: "700",
	},
	teamText2: {
		color: "#FFFFFF",
		...FONTS.ps3,
		fontWeight: "700",
	},
});
