// type HeroIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface SimpleCardProps {
    children?: React.ReactNode;
    className?: string;
}

export interface CardStyle {
    bg: string;
    text: string;
    icon: React.ReactElement;
}

export type CardType = "balance" | "budget" | "income" | "expense";

export interface CardData {
    title: string;
    amount: string;
    type: CardType;
}
