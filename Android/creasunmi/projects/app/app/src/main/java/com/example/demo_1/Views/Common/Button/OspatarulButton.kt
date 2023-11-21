package com.example.demo_1.Views.Common

import android.widget.TextView
import androidx.compose.foundation.Image
import androidx.compose.foundation.LocalIndication
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ContentAlpha
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.platform.debugInspectorInfo
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.toUpperCase
import androidx.compose.ui.unit.dp
import com.example.demo_1.Views.Common.Button.ButtonStatus
import com.example.demo_1.Views.Common.Button.ButtonType
import com.example.demo_1.ui.theme.OspatarulPurpleSecondary
import com.example.demo_1.ui.theme.OspatarulWhite
import com.example.demo_1.ui.theme.OspatarulYellow


@Composable
fun OspatarulButton(
    modifier: Modifier = Modifier,
    type: ButtonType = ButtonType.PRIMARY,
    status: ButtonStatus = ButtonStatus.NEUTRAL,
    text: String? = null,
    isEnabled: Boolean = true,
    minHeight: Int,
    minWidth: Int,
    onClick: () -> Unit,
) {
    Box(
        modifier.tuneContainerModifier(type, status, isEnabled, onClick),
        contentAlignment = Alignment.Center
    ) {
        ButtonContent(text, status, type, minHeight, minWidth)
    }
}

private fun Modifier.tuneContainerModifier(
    type: ButtonType,
    status: ButtonStatus,
    isEnabled: Boolean,
    onClick: () -> Unit,
): Modifier = composed {
    val cornerShape = RoundedCornerShape(20.dp)

    this.then(when (type) {
        ButtonType.PRIMARY -> this.border(
            1.dp,
            OspatarulPurpleSecondary,
            cornerShape
        )

        ButtonType.SECONDARY -> this.border(
            1.dp,
            OspatarulYellow,
            cornerShape
        )

        else -> this
    }
        .clip(cornerShape)
        .alpha(if (isEnabled) 1f else ContentAlpha.disabled)
        .background(type.mainColor)
        .clickableSingle(isEnabled) { if (status == ButtonStatus.NEUTRAL) onClick() }
    )
}

@Composable
fun ButtonContent(
    text: String?,
    status: ButtonStatus = ButtonStatus.NEUTRAL,
    buttonType: ButtonType,
    minHeight: Int,
    minWidth: Int
) {
    Box(contentAlignment = Alignment.Center) {
        Row(
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .defaultMinSize(
                    minWidth = minWidth.dp,
                    minHeight = minHeight.dp
                )
        ) {
            when (status) {
                ButtonStatus.NEUTRAL -> {
                    text?.let {
                        Text(text = text.uppercase(), color = buttonType.contentColor, textAlign = TextAlign.Center)
                    }
                }

                ButtonStatus.IN_PROGRESS -> {}

                ButtonStatus.SUCCESS -> {}
            }
        }
    }
}

fun Modifier.clickableSingle(
    enabled: Boolean = true,
    onClickLabel: String? = null,
    role: Role? = null,
    onClick: () -> Unit
) = composed(
    inspectorInfo = debugInspectorInfo {
        name = "clickable"
        properties["enabled"] = enabled
        properties["onClickLabel"] = onClickLabel
        properties["role"] = role
        properties["onClick"] = onClick
    }
) {
    val multipleEventsCutter = remember { MultipleEventsCutter.get() }
    Modifier.clickable(
        enabled = enabled,
        onClickLabel = onClickLabel,
        onClick = { multipleEventsCutter.processEvent { onClick() } },
        role = role,
        indication = LocalIndication.current,
        interactionSource = remember { MutableInteractionSource() }
    )

}
internal interface MultipleEventsCutter {
    fun processEvent(event: () -> Unit)

    companion object
}
internal fun MultipleEventsCutter.Companion.get(): MultipleEventsCutter =
    MultipleEventsCutterImpl()

private const val threshold = 300L
private class MultipleEventsCutterImpl : MultipleEventsCutter {
    private val now: Long
        get() = System.currentTimeMillis()

    private var lastEventTimeMs: Long = 0

    override fun processEvent(event: () -> Unit) {
        if (now - lastEventTimeMs >= threshold) {
            event.invoke()
        }
        lastEventTimeMs = now
    }
}