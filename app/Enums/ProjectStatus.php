<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Idea = 'idea';
    case Planning = 'planning';
    case InProgress = 'in_progress';
    case Paused = 'paused';
    case Finished = 'finished';

    public function label(): string
    {
        return match ($this) {
            self::Idea => 'Idea',
            self::Planning => 'Planificación',
            self::InProgress => 'En desarrollo',
            self::Paused => 'Pausado',
            self::Finished => 'Finalizado',
        };
    }

    /** @return array<int, string> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /** @return array<int, array{value: string, label: string}> */
    public static function options(): array
    {
        return array_map(
            fn (self $case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
